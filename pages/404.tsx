import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="not-found">
      <h1>PAGE NOT FOUND</h1>
      <img
        src="https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png"
        alt="404"
      />
      <button onClick={() => router.push("/")}>GO BACK TO HOME</button>
    </div>
  );
};

export default NotFoundPage;
