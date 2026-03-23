declare module 'react' {
  export type Context<T> = {
    Provider: (props: { value: T; children?: JSX.Element }) => JSX.Element;
  };
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initialState: T): [T, (value: T) => void];
}

declare module 'expo-status-bar' {
  export const StatusBar: (props: Record<string, unknown>) => JSX.Element;
}

declare module 'react-native' {
  export const SafeAreaView: any;
  export const ScrollView: any;
  export const StyleSheet: { create: <T>(styles: T) => T };
  export const Text: any;
  export const TouchableOpacity: any;
  export const View: any;
}

declare module 'react/jsx-runtime' {
  export const Fragment: unique symbol;
  export function jsx(type: any, props: any, key?: any): JSX.Element;
  export function jsxs(type: any, props: any, key?: any): JSX.Element;
}

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
