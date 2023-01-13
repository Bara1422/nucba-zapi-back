import {
  createCategoryInteractor,
  getCategoryInteractor,
} from './category.interactor';
import CategoryDataSource from '../../data/category.datasource';
import AuthDatasource from '../../data/auth.datasource';
import { loginAuthInteractor, siginAuthInteractor } from './auth.interactor';
import { getUserByIdInteractor } from './user.interactor';
import UserDataSource from '../../data/user.datasource';
import { createOrderInteractor } from './order.interactor';
import OrderDatasource from '../../data/order.datasource';
import PaymentDataSource from '../../data/payment.datasource';

// Repositories
const categoryRepository = new CategoryDataSource();
const authRepository = new AuthDatasource();
const userRepository = new UserDataSource();
const orderRepository = new OrderDatasource();
const paymentRepository = new PaymentDataSource();

// Interactors
const CreateCategoryInteractor = createCategoryInteractor(categoryRepository);
const GetCategoryInteractor = getCategoryInteractor(categoryRepository);
const LoginAuthInteractor = loginAuthInteractor(authRepository);
const SignInAuthInteractor = siginAuthInteractor(authRepository);
const GetUserByIdInteractor = getUserByIdInteractor(userRepository);
const CreateOrderInteractor = createOrderInteractor(
  orderRepository,
  paymentRepository
);

//Posible refactor
const interactors = {
  CreateCategoryInteractor,
  GetCategoryInteractor,
  LoginAuthInteractor,
  SignInAuthInteractor,
  GetUserByIdInteractor,
  CreateOrderInteractor,
};

export default interactors;
