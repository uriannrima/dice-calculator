import React, { useEffect, useMemo } from 'react';

import { DicePadButton } from './'
import { Grid, Col, Row } from '../../components/Grid';

function dicePadToRows({ dicePad, onClick, onLongClick }) {
  const { rows: rowsData } = dicePad;
  return rowsData.map((rowData, rowIndex) => {
    const { columns: columnsData } = rowData;
    const columns = columnsData.map((button, columnIndex) => {
      return (
        <Col key={columnIndex}>
          <DicePadButton
            button={button}
            onClick={onClick}
            onLongClick={onLongClick} />
        </Col>
      );
    });
    return <Row key={rowIndex}>{columns}</Row>;
  });
}

function createHotkeyMap({ dicePad }) {
  const hotkeyMap = {};
  dicePad.rows.forEach(row => {
    return row.columns.forEach(button => {
      const { hotkey } = button;
      if (hotkey !== undefined) {
        hotkeyMap[hotkey] = button;
      }
    });
  });
  return hotkeyMap;
}

export default function DicePad({
  tag: Tag,
  dicePad,
  onClick,
  onLongClick
}) {
  const rows = dicePadToRows({
    dicePad,
    onClick,
    onLongClick
  });

  const hotkeyMap = useMemo(() => {
    return createHotkeyMap({ dicePad });
  }, [dicePad]);

  useEffect(() => {
    function onKeyUp({ key }) {
      const button = hotkeyMap[key];
      if (button) {
        onClick(button);
      }
    }

    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  });

  return (
    <Tag className="DicePad">
      <Grid>{rows}</Grid>
    </Tag>
  );
};

DicePad.defaultProps = {
  tag: "div"
};