export const WHATSAPP_NUMBER = '5493572546583'

export function consultationMessage(context, details, lines) {
  const line = lines.find(item => item.id === context.lineId)
  const product = context.productName ? `\nProducto: ${context.productName}` : ''
  const code = context.productCode ? `\nCódigo de producto: ${context.productCode}` : ''
  const reference = line
    ? `\nReferencia sugerida (manual): FT-${line.referenceCode}${context.productCode ? `-${context.productCode}` : ''}`
    : ''
  const question = details.trim() ? `\nConsulta: ${details.trim()}` : ''
  return `Hola Fulano, quisiera consultar${line ? ` por ${line.name}` : ''}.${product}${code}${reference}${question}`
}

export function whatsappUrl(message) {
  const query = new URLSearchParams({ text: message })
  return `https://wa.me/${WHATSAPP_NUMBER}?${query}`
}
