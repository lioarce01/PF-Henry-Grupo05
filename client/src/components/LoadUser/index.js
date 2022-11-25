import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateUserMutation,
  useLazyGetUserByEmailQuery,
} from "../../redux/api/users";
import { setUserAction, clearFollowingAction } from "../../redux/slices/manageUsers/actions";
import {
	useAddFollowersMutation,
	useDeleteFollowersMutation,
} from "../../redux/api/shelters"

const LoadUser = () => {
  const { isAuthenticated, user } = useAuth0();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch()
  const [unfollow] = useDeleteFollowersMutation()
  const [follow] = useAddFollowersMutation()
  const userOnline = useSelector(state => state.localStorage.userState)

  const load = async () => {
    if (isAuthenticated) {
      const { data } = await getUserByEmail(user.email);
      if (!data) {
        const { newUser } = await createUser({
          name: user.nickname,
          email: user.email,
          profilePic: user.picture,
        }).unwrap();
        dispatch(setUserAction(newUser, isAuthenticated));
        await follows(newUser)
        dispatch(clearFollowingAction())
      }
      const newUser = data.payload;     
      dispatch(setUserAction(newUser, isAuthenticated));
      await follows(newUser)
      dispatch(clearFollowingAction())
    }
  };

  const follows = async (newUser) =>{
    console.log('newUser:',newUser);
    for(const f of userOnline.following){
      await follow({userId: newUser.id, shelterId: f.id})
    }
  };
  
  useEffect(() => {
    load()
  },[isAuthenticated, user]);
};

export default LoadUser;
