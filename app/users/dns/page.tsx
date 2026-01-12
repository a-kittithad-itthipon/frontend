import User_sidebar from "@/app/components/user_sidebar";
import DNS from "@/app/components/dns";

const dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <DNS />
    </div>
  );
};
export default dashboard;
