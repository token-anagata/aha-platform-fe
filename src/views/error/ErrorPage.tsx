import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="grid min-h-screen content-center place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-aha-green-light text-white">
        <div className="text-center">
          <img className="w-full h-40" alt="aha" src="https://aha-staging.genesysindonesia.com/icon/ahalogo.png" />
          <h2 className="self-center font-bold text-white text-3xl">Oops!</h2>
          <p className="text-xl p-2 mb-2">Sorry, an unexpected error has occurred.</p>
          <p className="text-xl p-2 mb-2">{error.statusText || error.data}</p>
        </div>
      </main>
    );
  } else {
    return (
      <main className="grid min-h-screen content-center place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-aha-green-light text-white">
        <div className="text-center">
          <img className="w-full h-40" alt="aha" src="https://aha-staging.genesysindonesia.com/icon/ahalogo.png" />
          <h2 className="self-center font-bold text-white text-3xl">Oops!</h2>
          <p className="text-xl p-2 mb-2">Sorry, an unexpected error has occurred.</p>
          <p className="text-xl p-2 mb-2">Your not authenticated.</p>
          <p className="text-xl p-2 mb-2"><i>{(error as Error).message}</i></p>
        </div>
      </main>
    );
  }
};

export default ErrorPage;
