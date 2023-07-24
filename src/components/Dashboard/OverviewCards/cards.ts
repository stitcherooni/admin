import SalesImage from '../../../assets/images/sales-Image.png';
import OrdersImage from '../../../assets/images/orders-Image.png';
import EventsImage from '../../../assets/images/events-Image.png';
import ListingsImage from '../../../assets/images/listings-Image.png';
import SponsorsImage from '../../../assets/images/sponsors-Image.png';
import CustomersImage from '../../../assets/images/customers-Image.png';
import AvgValueImage from '../../../assets/images/avg-value-image.png';
import BusinessDirectoryImage from '../../../assets/images/business-directory-image.png';

export enum CardsName {
  CUSTOMERS = 'Customers',
  SALES = 'Total Sales',
  ORDERS = 'Total Orders',
  EVENTS = 'Events',
  PRODUCTS = 'Products',
  SPONSORS = 'Live Sponsors',
  AVG_ORDER = 'Avg Order Value',
  BUSINESS_DIRECTORY = 'Live Business Directory',
}

export const cardsList = [
  {
    id: 1,
    title: CardsName.SALES,
    count: '£123',
    btnText: 'View Sales',
    img: SalesImage,
  },
  {
    id: 2,
    title: CardsName.ORDERS,
    count: 123,
    btnText: 'View Orders',
    img: OrdersImage,
  },
  {
    id: 3,
    title: CardsName.AVG_ORDER,
    count: '£123',
    btnText: 'View Orders',
    img: AvgValueImage,
  },
  {
    id: 4,
    title: CardsName.CUSTOMERS,
    count: 123,
    btnText: 'View Customers',
    img: CustomersImage,
  },
  {
    id: 5,
    title: CardsName.EVENTS,
    count: 123,
    btnText: 'View Events',
    img: EventsImage,
  },
  {
    id: 6,
    title: CardsName.PRODUCTS,
    count: 123,
    btnText: 'View Products',
    img: ListingsImage,
  },
  {
    id: 7,
    title: CardsName.SPONSORS,
    count: 123,
    btnText: 'View Sponsors',
    img: SponsorsImage,
  },
  {
    id: 8,
    title: CardsName.BUSINESS_DIRECTORY,
    count: 123,
    btnText: 'View Directory',
    img: BusinessDirectoryImage,
  },
];
