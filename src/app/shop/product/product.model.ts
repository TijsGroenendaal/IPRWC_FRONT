export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public quantity: number,
    public price: number,
    public description: string,
    public imageUrl: string,
  ) {}
}
