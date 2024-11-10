import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Image } from './Image';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text
          as="p"
          color={Color.MONO_100}
          src={[0, 1, 2, 3, 4].map((i) => `/assets/term/${i}.txt`)}
          typography={Typography.NORMAL12}
        >
          {'\n罪と罰\nフョードル・ミハイロヴィッチ・ドストエフスキー\n米川正夫訳\n\n--------------------------------------------' +
            '-----------\n【テキスト中に現れる記号について】\n\n《》：ルビ\n（例）臆病《おくびょう》\n\n｜：ルビの付く文字列の始まりを特定する記号\n（例）全然｜放'}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text
          as="p"
          color={Color.MONO_100}
          src={[0, 1, 2, 3].map((i) => `/assets/contact/${i}.txt`)}
          typography={Typography.NORMAL12}
        >
          {'\nパソコン創世記\n富田倫生\n\n-------------------------------------------------------\n【テキスト中に現れ' +
            'る記号について】\n\n［＃］：入力者注\u{3000}主に外字の説明や、傍点の位置の指定\n\u{3000}\u{3000}\u{3000}（数字は、JIS X 0213の面区点番号またはUnicode、底本のページと行'}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text
          as="p"
          color={Color.MONO_100}
          src={[0, 1, 2, 3].map((i) => `/assets/question/${i}.txt`)}
          typography={Typography.NORMAL12}
        >
          {'\nドグラ・マグラ\n夢野久作\n\n-------------------------------------------------------\n【テキスト中に現れ' +
            'る記号について】\n\n《》：ルビ\n（例）蜜蜂《みつばち》\n\n｜：ルビの付く文字列の始まりを特定する記号\n（例）大の字｜型《なり》に\n\n［＃］：入力者注　主に外字の'}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text
          as="p"
          color={Color.MONO_100}
          src={[0, 1, 2].map((i) => `/assets/company/${i}.txt`)}
          typography={Typography.NORMAL12}
        >
          {'\n吾輩は猫である\n夏目漱石\n\n-------------------------------------------------------\n【テキスト中に現れ' +
            'る記号について】\n\n《》：ルビ\n（例）吾輩《わがはい》\n\n｜：ルビの付く文字列の始まりを特定する記号\n（例）一番｜獰悪《どうあく》\n\n［＃］：入力者注\u{3000}主に外字'}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text
          as="p"
          color={Color.MONO_100}
          src={[0, 1].map((i) => `/assets/overview/${i}.txt`)}
          typography={Typography.NORMAL12}
        >
          {'\nこころ\n夏目漱石\n\n-------------------------------------------------------\n【テキスト中に現れる記号に' +
            'ついて】\n\n《》：ルビ\n（例）私《わたくし》は\n\n｜：ルビの付く文字列の始まりを特定する記号\n（例）先生一人｜麦藁帽《むぎわらぼう》を\n\n［＃］：入力者注\u{3000}主に'}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <Image alt="Cyber TOON" height={45} src="/assets/cyber-toon.webp" width={189} />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
