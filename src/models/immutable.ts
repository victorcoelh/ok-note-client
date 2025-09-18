import produce, { applyPatches, Draft, enablePatches, Patch } from "immer";

enablePatches();

export class ImmutableArray<T> {
  private history: Array<{ patches: Array<Patch>, inversePatches: Array<Patch>}>;
  private current: Array<T>;
  private pointer: number;

  constructor(initial: Array<T> = []) {
    this.current = initial
    this.history = []
    this.pointer = -1;
  }

  get value() {
    return this.current;
  }

  update(recipe: (draft: Draft<Array<T>>) => void) {
    const [next, patches, inversePatches] = produce.produceWithPatches(this.current, recipe)

    this.current = next;
    this.history = this.history.slice(0, this.pointer + 1);
    this.history.push({ patches, inversePatches });
    this.pointer++;
  }

  replace(newValue: Array<T>) {
    this.update(() => newValue);
  }

  push(item: T) {
    this.update(draft => draft.push(item as Draft<T>))
  }

  pop(): T {
    let value!: T;

    this.update(draft => {
      value = draft.pop() as T;
    })

    return value;
  }

  undo() {
    if (this.pointer < 0) return;

    const { inversePatches } = this.history[this.pointer];
    this.current = applyPatches(this.current, inversePatches);
    this.pointer--;
  }

  redo() {
    if (this.pointer > this.history.length - 2) return;

    const { patches } = this.history[this.pointer + 1];
    this.current = applyPatches(this.current, patches);
    this.pointer++;
  }
}
