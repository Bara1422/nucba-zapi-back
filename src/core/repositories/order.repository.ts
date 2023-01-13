import { OrderRequestDto} from '../dto/Order';
import { Order } from '../entities/orders';
import { Result } from '../types/response';

export default interface OrderRepository {
  createOrder(data: OrderRequestDto): Promise<Result<Order>>;
}
