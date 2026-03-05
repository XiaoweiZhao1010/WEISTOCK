type HeaderProps = {
  title: string;
};

const index = ({ title }: HeaderProps) => {
  return (
    <h1 className="text-xl font-bold lg:text-2xl mb-3 text-gray-700">
      {title}
    </h1>
  );
};

export default index;
