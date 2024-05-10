import Logo from './components/logo/logo.compnent';
import Form from './components/form/form.component';
import PackingList from './components/packing-list/packingList.component';
import Footer from './components/footer/footer.component';
import { useEffect, useState } from 'react';
import { Itemt } from './components/item/item.component';

const App = () => {
  const [items, setItems] = useState<Itemt[]>([]);

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos');
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  const handleAddItems = (item: Itemt) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const deleteItem = async (itemId: number) => {
    await fetch(`http://localhost:5000/todos/${itemId}`, { method: 'DELETE' });
    setItems(items => items.filter(item => item.id !== itemId));
  };

  const handleCheck = async (itemId: number, packed: boolean) => {
    await fetch(`http://localhost:5000/todos/${itemId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ packed: !packed }),
    });

    setItems(items =>
      items.map(el => (el.id === itemId ? { ...el, packed: !el.packed } : el))
    );
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear your To Dos?')) {
      setItems([]);
      await fetch('http://localhost:5000/todos', { method: 'DELETE' });
    }
  };

  const finished = items.filter(item => item.packed).length;
  const finishedPercentage = Math.round((finished / items.length) * 100);
  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onCheck={handleCheck}
        onClear={handleClear}
      />
      <Footer
        items={items.length}
        finishedPercentage={finishedPercentage}
        finished={finished}
      />
    </div>
  );
};

export default App;
