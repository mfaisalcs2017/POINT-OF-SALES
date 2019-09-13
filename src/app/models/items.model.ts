export class Items {
  constructor(
    public id: number,
    public name: string = "",
    public price: number = 0,
    public category: string = "",
    public description: string = "",
    public image: string[] = []
  ) {}
}
