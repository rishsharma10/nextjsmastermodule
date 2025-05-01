import { apiClient } from "@/lib/apiClient";
import { Fragment } from "react";
import { AntForm, Input, Button, TypographyTitle ,FormItem} from "@/antd/lib/AntRegistry";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginAsAdmin, loginUser } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { COOKIES_ACCESS_TOKEN_ADMIN } from "@/actions/actionTypes";

const Signin = () => {
  const { isLoading, error, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(userInfo, "userinfoooo");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    let apiRes = await dispatch(loginAsAdmin(payload));
    if (apiRes?.payload?.error) {
      toast.error(apiRes?.payload?.error);
    } else {
      setCookie(
        null,
        COOKIES_ACCESS_TOKEN_ADMIN,
        apiRes?.payload?.data?.access_token,
        {
          path: "/",
        }
      );
      router.replace("/admin/dashboard");
      toast.success("Login successfully");
    }
  };

  return (
    <Fragment>
      <div className="login-container">
        <TypographyTitle level={3} className="login-title">
          Login
        </TypographyTitle>

        <AntForm name="login-form" onFinish={onFinish} layout="vertical">
          <FormItem
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>

          <FormItem
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input placeholder="Password" />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </FormItem>
        </AntForm>
      </div>
    </Fragment>
  );
};
export default Signin;
