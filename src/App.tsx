import Logo from './components/logo/logo.compnent';
import Form from './components/form/form.component';
import PackingList from './components/packing-list/packingList.component';
import Footer from './components/footer/footer.component';
import { useState } from 'react';
import { Itemt } from './components/item/item.component';

const App = () => {
  const [items, setItems] = useState<Itemt[]>([]);

  const handleAddItems = (item: Itemt) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const deleteItem = (itemId: number) => {
    setItems(items => items.filter(item => item.id !== itemId));
  };

  const handleCheck = (itemId: number) => {
    setItems(items =>
      items.map(el => (el.id === itemId ? { ...el, packed: !el.packed } : el))
    );
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your To Dos?'))
      setItems([]);
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
