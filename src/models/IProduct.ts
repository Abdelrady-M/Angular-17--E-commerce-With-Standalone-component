interface IProduct {
  id: number;
  Name: string;
  Quantity: number;
  Price: number;
  Img?: string;
  Categoryid?: number;
  Factory?:string;
}

export default IProduct;
