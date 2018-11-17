/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  let { data } = await resp.json();
  // override with dummy data for now
  data = {
    news: [
      {
        link: '/',
        title: 'Gud Side',
        content: 'Lorem ipsum',
      },
    ],
  };
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  return {
    title: 'GudSide Home',
    chunks: ['home'],
    component: (
      <Layout>
        <Home news={data.news} />
      </Layout>
    ),
  };
}

export default action;
