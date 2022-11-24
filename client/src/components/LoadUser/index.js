import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useCreateUserMutation,
  useLazyGetUserByEmailQuery,
} from "../../redux/api/users";
import { setUserAction } from "../../redux/slices/manageUsers/actions";

const LoadUser = () => {
  const { isAuthenticated, user } = useAuth0();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch()

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
      }
      const newUser = data.payload;
      dispatch(setUserAction(newUser, isAuthenticated));
    }
  };

  useEffect(() => {
    load()
  },[isAuthenticated, user]);
};

export default LoadUser;
