import AuthLayout from "../layout/AuthLayout";
import AuthHeader from "../common/AuthHeader";
import SignUpForm from "../forms/SignUpForm";

export default function SignUpPage() {
  <AuthLayout>
    <AuthHeader title="Crie a sua conta" />
    <SignUpForm />
  </AuthLayout>;
}
