import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Seo } from 'src/src2/components/seo';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { Layout as ComponentsLayout } from 'src/src2/layouts/components';
import { Layout as MarketingLayout } from 'src/src2/layouts/marketing';
import { Previewer } from 'src/src2/sections/components/previewer';
import { GroupedList1 } from 'src/src2/sections/components/grouped-lists/grouped-list-1';
import { GroupedList2 } from 'src/src2/sections/components/grouped-lists/grouped-list-2';
import { GroupedList3 } from 'src/src2/sections/components/grouped-lists/grouped-list-3';
import { GroupedList4 } from 'src/src2/sections/components/grouped-lists/grouped-list-4';
import { GroupedList5 } from 'src/src2/sections/components/grouped-lists/grouped-list-5';
import { GroupedList6 } from 'src/src2/sections/components/grouped-lists/grouped-list-6';
import { GroupedList7 } from 'src/src2/sections/components/grouped-lists/grouped-list-7';
import { GroupedList8 } from 'src/src2/sections/components/grouped-lists/grouped-list-8';
import { GroupedList9 } from 'src/src2/sections/components/grouped-lists/grouped-list-9';
import { GroupedList10 } from 'src/src2/sections/components/grouped-lists/grouped-list-10';
import { GroupedList11 } from 'src/src2/sections/components/grouped-lists/grouped-list-11';

const components = [
  {
    element: <GroupedList1 />,
    title: 'Grouped list 1',
  },
  {
    element: <GroupedList2 />,
    title: 'Grouped list 2',
  },
  {
    element: <GroupedList3 />,
    title: 'Grouped list 3',
  },
  {
    element: <GroupedList4 />,
    title: 'Grouped list 4',
  },
  {
    element: <GroupedList5 />,
    title: 'Grouped list 5',
  },
  {
    element: <GroupedList6 />,
    title: 'Grouped list 6',
  },
  {
    element: <GroupedList7 />,
    title: 'Grouped list 7',
  },
  {
    element: <GroupedList8 />,
    title: 'Grouped list 8',
  },
  {
    element: <GroupedList9 />,
    title: 'Grouped list 9',
  },
  {
    element: <GroupedList10 />,
    title: 'Grouped list 10',
  },
  {
    element: <GroupedList11 />,
    title: 'Grouped list 11',
  },
];

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Grouped Lists" />
      <ComponentsLayout title="Grouped Lists">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={8}>
              {components.map((component) => (
                <Previewer
                  key={component.title}
                  title={component.title}
                >
                  {component.element}
                </Previewer>
              ))}
            </Stack>
          </Container>
        </Box>
      </ComponentsLayout>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;