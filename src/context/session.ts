import { useCookies } from "react-cookie";

interface ISessionRepository {
  session: () => string | null;
  isAuthorized: () => boolean;
  save: (value: string) => void;
  remove: () => void;
}

export function SessionRepository(): ISessionRepository {
  const [cookies, setCookie, removeCookie] = useCookies([""]);

  function session(): string | null {
    const result = cookies["x-adm-session"];
    return result === undefined ? null : (result as string);
  }

  function isAuthorized(): boolean {
    const result = session();
    return result !== null;
  }

  function save(value: string): void {
    setCookie("x-adm-session", value);
  }

  function remove(): void {
    removeCookie("x-adm-session");
  }

  return {
    session: session,
    isAuthorized: isAuthorized,
    save: save,
    remove: remove,
  };
}
