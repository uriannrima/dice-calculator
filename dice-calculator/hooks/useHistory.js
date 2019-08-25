import { useState } from 'react';

import useDidUpdateEffect from './useDidUpdateEffect';

export default function useHistory({
  maxHistory = 20,
  historyItem,
  shouldPush = () => true,
  initialHistory = []
}) {
  const [history, setHistory] = useState(initialHistory);

  const pushToHistory = (result) => {
    let newHistory = [...history];
    if (newHistory.length >= maxHistory) {
      newHistory = [...newHistory.slice(0, history.length - 1)];
    }
    setHistory([result].concat(newHistory));
  }

  useDidUpdateEffect(() => {
    shouldPush(historyItem) && pushToHistory(historyItem);
  }, [historyItem]);

  return {
    history,
    setHistory
  };
}