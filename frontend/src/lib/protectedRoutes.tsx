import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

// Função para proteger rotas
export function protectedRoutes(
  getServerSidePropsFunc?: GetServerSideProps
): GetServerSideProps {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    try {
      const { req } = context;
      const cookies = req.headers.cookie;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/checkToken`,
        {
          headers: {
            Cookie: cookies || "",
          },
          withCredentials: true,
        }
      );

      if (!response.data.isAuthenticated) {
        throw new Error("Usuário não autenticado");
      }

      if (getServerSidePropsFunc) {
        return await getServerSidePropsFunc(context);
      }

      return { props: {} };
    } catch (error) {
      return {
        redirect: {
          destination: "/authentication",
          permanent: false,
        },
      };
    }
  };
}
