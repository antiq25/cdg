import * as Yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/src2/components/router-link';
import { Seo } from 'src/src2/components/seo';
import { GuestGuard } from 'src/src2/guards/guest-guard';
import { IssuerGuard } from 'src/src2/guards/issuer-guard';
import { useAuth } from 'src/src2/hooks/use-auth';
import { useMounted } from 'src/src2/hooks/use-mounted';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { useRouter } from 'src/src2/hooks/use-router';
import { useSearchParams } from 'src/src2/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/src2/layouts/auth/classic-layout';
import { paths } from 'src/src2/paths';
import { AuthIssuer } from 'src/src2/sections/auth/auth-issuer';
import { Issuer } from 'src/src2/utils/auth';

const getInitialValues = (username) => {
  if (username) {
    return {
      email: username,
      password: '',
      submit: null,
    };
  }

  return {
    email: 'demo@devias.io',
    password: 'Password123!',
    submit: null,
  };
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || undefined;
  const returnTo = searchParams.get('returnTo');
  const { issuer, signIn } = useAuth();
  const formik = useFormik({
    initialValues: getInitialValues(username),
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password);

        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          if (err.code === 'UserNotConfirmedException') {
            const searchParams = new URLSearchParams({ username: values.email }).toString();
            const href = paths.auth.amplify.confirmRegister + `?${searchParams}`;
            router.push(href);
            return;
          }

          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account? &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.auth.amplify.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                }}
              >
                <Link
                  component={RouterLink}
                  href={paths.auth.amplify.forgotPassword}
                  underline="hover"
                  variant="subtitle2"
                >
                  Forgot password?
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Alert severity="error">
            <div>
              You can use <b>demo@devias.io</b> and password <b>Password123!</b>
            </div>
          </Alert>
          <AuthIssuer issuer={issuer} />
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Amplify}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
