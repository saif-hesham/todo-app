import { FormEvent, useState } from 'react';
import { Itemt } from '../item/item.component';
type FormProps = {
  onAddItem: (item: Itemt) => void;
};
const Form = ({ onAddItem }: FormProps) => {
  const [desc, setDesc] = useState('');
  const [quantity, setQuantity] = useState(1);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!desc.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ description: desc, quantity, packed: false }),
      });
      const data = await res.json();
      onAddItem(data);
      // console.log(res);
      //window.location = '/';
    } catch (err: any) {
      console.error(err.message);
    }

    setDesc('');
    setQuantity(1);
  };
  return (
    <form className='add-form' onSubmit={submitHandler}>
      <h3>💪🏽 Lets work on these tasks 💪🏽</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(val => (
          <option key={val}>{val}</option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Add a todo...'
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default Form;
