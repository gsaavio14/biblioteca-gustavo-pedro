export const helpers = {
    rotuloDisponibilidade: (disponivel: number) => {
        let color = 'danger';
        let texto = 'Indisponível';

        if (disponivel > 0) {
            color = 'success';
            texto = 'Disponível';
        }

        return `<span class="badge text-bg-${color}">${texto}</span>`;
    }
};