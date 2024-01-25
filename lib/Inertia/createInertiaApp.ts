import App, { AppProps } from './App';
import InertiaRequest from './InertiaRequest';

export default function createInertiaApp(props: InertiaCreateAppParams) {
  const { server, setup, resolve, routes } = props;
  InertiaRequest.init(server);

  return setup({ App, props: { resolve, routes } });
}

export type InertiaPageResolver = (
  name: string,
) =>
  | React.FunctionComponent<InertiaPage['props']>
  | React.ComponentClass<InertiaPage['props']>;

export interface InertiaCreateAppParams {
  server: string;
  routes: string[];
  resolve: InertiaPageResolver;
  setup: (page: {
    App: React.FunctionComponent<AppProps> | React.ComponentClass<AppProps>;
    props: AppProps;
  }) => React.ReactNode;
}
