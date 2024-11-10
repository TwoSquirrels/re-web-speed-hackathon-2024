import _ from 'lodash';
import moment from 'moment-timezone';
import { useId } from 'react';

import { BookCard, SkeletonBookCard } from '../../features/book/components/BookCard';
import { FeatureCard, SkeletonFeatureCard } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { RankingCard, SkeletonRankingCard } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';

const Feature: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {featureList.length === 0
        ? Array.from({ length: 50 }, (_, index) => <SkeletonFeatureCard key={index} />)
        : _.map(featureList, (feature) => <FeatureCard key={feature.id} bookId={feature.book.id} />)}
    </Flex>
  );
};

const Ranking: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {rankingList.length === 0
        ? Array.from({ length: 50 }, (_, index) => <SkeletonRankingCard key={index} />)
        : _.map(rankingList, (ranking) => <RankingCard key={ranking.id} bookId={ranking.book.id} />)}
    </Flex>
  );
};

const Release: React.FC = () => {
  const todayStr = getDayOfWeekStr(moment());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {release.id === ''
        ? Array.from({ length: 50 }, (_, index) => <SkeletonBookCard key={index} />)
        : _.map(release.books, (book) => <BookCard key={book.id} bookId={book.id} />)}
    </Flex>
  );
};

const TopPage: React.FC = () => {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Feature />
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
            <Ranking />
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
            <Release />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export { TopPage };
