import { OrderRequestDto } from '../dto/Order';
import { Order } from '../entities/orders';
import { Result } from '../types/response';

export default interface OrderRepository {
  createOrder(data: OrderRequestDto): Promise<Result<Order>>;
  //getOrderByUserId(userId): Promise<Result<Order[]>>
  //getOrder(userId): Promise<Result<Order[]>>
}
