import ApproveUsersTable from "../../components/ui/Promotion/ApproveUsers";
import CreateOffer from "../../components/ui/Promotion/CreateOffer";
import PromotionReachChart from "../../components/ui/Promotion/PromotionReachChart";

const Promotion = () => {
  return (
    <div>
      <div className="flex w-full gap-5">
        <div className="w-7/12">
          <PromotionReachChart />
        </div>
        <div className="w-5/12">
          <CreateOffer />
        </div>
      </div>
      <ApproveUsersTable />
    </div>
  );
};

export default Promotion;
