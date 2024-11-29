import { useState, useEffect } from "react";

type HTTPmethods = "put" | "patch" | "post" | "get" | "Delete";

interface UseFetchReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: boolean;
}

export const useFetch = <T>(
  url: string,
  method: HTTPmethods,
  body?: BodyInit | undefined | null
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (url.length) {
        setLoading(true);
        try {
          let response;
          switch (method) {
            case "get":
              response = await fetch(url);
              break;
            default:
              response = await fetch(url, {
                method: method,
                body,
              });

              break;
          }
          const data: T | undefined = await response.json();
          setData(data);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [body, method, url]);

  return { data, loading, error };
};
