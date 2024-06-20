interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className={
        "relative flex min-h-screen flex-col items-start justify-start bg-white text-neutral-800"
      }
    >
      {/* The Page Content */}
      <section className="relative flex w-full flex-col items-start justify-start">
        {children}
      </section>
    </main>
  );
};

export default AppLayout;
