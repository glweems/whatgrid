import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class BookResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  static book() {
    return 'The Republic';
  }
}

export default BookResolver;
