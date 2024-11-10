import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();

  if (document.readyState === 'loading') {
    await new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve));
  }
  const root = document.getElementById('root')!;

  if (window.location.pathname.startsWith('/admin')) {
    ReactDOM.createRoot(root).render(<AdminApp />);
  } else {
    ReactDOM.hydrateRoot(
      root,
      <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
