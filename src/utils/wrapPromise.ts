/**
 * wrapPromise utility for React Suspense
 *
 * This demonstrates how Suspense works under the hood.
 * It wraps a promise and provides a read() method that:
 * - Throws the promise if still pending (Suspense catches this)
 * - Throws the error if rejected
 * - Returns the result if resolved
 */

type PromiseStatus = 'pending' | 'success' | 'error';

interface WrappedPromise<T> {
  read(): T;
}

export function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
  let status: PromiseStatus = 'pending';
  let result: T;
  let error: any;

  // Attach handlers to the promise
  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      switch (status) {
        case 'pending':
          // Throw the promise - Suspense will catch it!
          throw suspender;
        case 'error':
          // Throw the error - Error Boundary will catch it
          throw error;
        case 'success':
          // Return the data
          return result;
      }
    },
  };
}

/**
 * Example usage:
 *
 * const userResource = wrapPromise(fetchUser(1));
 *
 * function UserProfile() {
 *   const user = userResource.read(); // Throws promise while loading
 *   return <div>{user.name}</div>;
 * }
 *
 * <Suspense fallback={<Loading />}>
 *   <UserProfile />
 * </Suspense>
 */
