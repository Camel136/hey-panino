import './index.css';
import ThreeJs from '../pages/threeJS';
import WebSite from '../pages/webSite';
import App from '../pages/app';
import { useContext } from 'react';
import { Context } from '../context/context';

export default function Modal({ open, onClose }) {
  const { destiny } = useContext(Context);
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  if (!open) return null;

  function renderPage() {
    switch (destiny) {
      case 0:
        return <ThreeJs />;

      case 1:
        return <WebSite />;

      case 2:
        return <App />;

      default:
        return <p>Página não encontrada.</p>;
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            onPre
            aria-label="Fechar modal"
          >
            Aperte Esc para sair
          </button>
        </div>

        <div className="modal-content">{renderPage()}</div>
      </div>
    </div>
  );
}
