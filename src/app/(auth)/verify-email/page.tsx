import { verifyEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { MdOutlineMailOutline } from "react-icons/md";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const result = await verifyEmail(
    searchParams.token
  );

  return (
    <CardWrapper
      headerText="Verify your email address"
      headerIcon={MdOutlineMailOutline}
      footer={<ResultMessage result={result} />}
    />
  );
}
