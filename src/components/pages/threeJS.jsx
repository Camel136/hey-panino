
export default function ThreeJs() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <iframe
          src="https://camel136.github.io/reactScene/"
          title="ThreeJS Preview"
          style={{
            width: '100%',
            height: '250px',
            border: 'none',
          }}
        />

        <span
          style={{
            fontSize: '0.6rem',
            textAlign: 'center',
            color: '#666',
            fontStyle: 'italic',
          }}
        >
          Clique na imagem para interagir.
        </span>
      </div>

      <h2>Three JS</h2>

      <p
        style={{
          fontSize: '0.8rem',
        }}
      >
        Desenvolvi este cenário interativo em 3D utilizando React e Three.js
        para transformar a experiência do meu portfólio em algo imersivo.
        Diferente de um site estático, aqui o usuário pode explorar o ambiente,
        unindo performance, design e animação dentro do ecossistema React.
      </p>

      <p>
        <strong>Tecnologias utilizadas:</strong>
        <br />
        • Blender (modelagem do cenário)
        <br />
        • React + Vite
        <br />
        • React Three Fiber
        <br />
        • Drei
        <br />• Hooks personalizados para otimização
      </p>
      <a
        style={{
          fontSize: '0.8rem',
        }}
        href="https://camel136.github.io/reactScene/"
      >
        Acessar git
      </a>
    </>
  );
}
