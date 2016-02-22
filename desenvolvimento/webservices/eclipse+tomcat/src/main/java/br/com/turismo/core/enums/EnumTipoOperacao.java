package br.com.turismo.core.enums;

public enum EnumTipoOperacao {
	DEFAULT("D"), LISTAR("L"), INSERIR("I"), ALTERAR("A"), EXCLUIR("E");

	private String operacao;

	private EnumTipoOperacao(String operacao) {
		this.operacao = operacao;
	}

	public String getOperacao() {
		return operacao;
	}

	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}

	public static EnumTipoOperacao getValueOf(String operacao) {
		EnumTipoOperacao[] lista = EnumTipoOperacao.values();
		for (EnumTipoOperacao op : lista) {
			if (op.getOperacao().equals(operacao)) {
				return op;
			}
		}
		return null;
	}
}
