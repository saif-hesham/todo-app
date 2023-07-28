export type Itemt = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

type itemProps = {
  item: Itemt;
  onDeleteItem: (item: number) => void;
  onCheck: (itemId: number) => void;
};

const Item = ({ item, onDeleteItem, onCheck }: itemProps) => {
  return (
    <li>
      <input
        type='checkbox'
        checked={item.packed}
        onChange={e => onCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={e => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

export default Item;
