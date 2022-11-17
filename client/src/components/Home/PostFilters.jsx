import { useDispatch } from "react-redux";
import { sortPostsAction } from "../../redux/slices/managePosts/actions";

const PostFilters = () => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    e.preventDefault();
    let order = e.target.value.split(",")[0];
    let type = e.target.value.split(",")[1];
    dispatch(sortPostsAction(order, type));
  };

  return (
    <div>
      <select className="bg-[#F8D44B] px-[10px] py-[5px] rounded-[20px] font-[500]" onChange={(e) => handleSort(e)} defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>
          Sort
        </option>
        <option value="createdAt,desc">Latest</option>
        <option value="createdAt,asc">Oldest</option>
        <option value="likes,desc">Likes +</option>
        <option value="likes,asc">Likes -</option>
      </select>
    </div>
  );
};

export default PostFilters;
