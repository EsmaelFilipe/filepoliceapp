import AuthLayout from "../layout/AuthLayout";
import LoginForm from "../forms/LoginForm";
import AuthHeader from "../header/AuthHeader";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader title="Login" />
      <LoginForm />
    </AuthLayout>
  );
}
