import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Seo } from 'src/src2/components/seo';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { useSettings } from 'src/src2/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import WidgetCreator from 'src/components/company_card/createWidgets';
import useUser  from 'src/hooks/decode'; 
import { ApiProvider, useApi } from 'src/components/company_card/apiWidget';





const Page = () => {
    const settings = useSettings();
    const api = useApi();
    const userId = useUser();
    usePageView();
    
    
    async function fetchUserWidget(userId) {
      try {
        const widgets = await api.fetchUserWidget(userId);
        console.log(widgets);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserWidget(userId)
      .then(widgets => {
        console.log('Fetched widgets for the user:', widgets);
      })
      .catch(error => {
        console.error('Error fetching widgets for the user:', error);
      });
    

  return (
    <>
    <ApiProvider>
      <Seo title="Dashboard: Blank" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <div>
                <Typography variant="h4">Blank</Typography>
              </div>
              <div>
                <Stack
                  direction="row"
                  spacing={4}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Action
                  </Button>
                </Stack>
              </div>
            </Stack>
            <Box
              sx={{
                borderColor: 'neutral.300',
                borderStyle: 'dashed',
                borderWidth: 1,
                height: 300,
                p: '4px',
              }}
            />
            <WidgetCreator />
            
            
          </Stack>
        </Container>
      </Box>
      </ApiProvider>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default Page;