import Container from "@/app/components/Container/Container";
import PostList from "@/app/components/PostList/PostList";

const Home: React.FC = () => {
  return (
    <>
      <div className="pt-8">
        {" "}
        <Container>
          <PostList />
        </Container>
      </div>
    </>
  );
};

export default Home;
