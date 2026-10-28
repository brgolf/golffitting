document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-program]').forEach(card => card.addEventListener('click', () => {document.getElementById('program').value = card.dataset.program;}));
document.getElementById('consult').addEventListener('submit', event => {
 event.preventDefault();
 const form = event.currentTarget;
 const name = form.elements.name.value.trim();
 if (!name) {form.elements.name.setCustomValidity('성함을 입력해 주세요.'); form.elements.name.reportValidity(); return;}
 const text = `BR GOLF 피팅 상담 메모\n\n성함: ${name}\n관심 프로그램: ${form.elements.program.value}\n고민: ${form.elements.message.value.trim() || '없음'}\n\n상담 준비용 메모이며 매장으로 전송되지 않았습니다.`;
 const url = URL.createObjectURL(new Blob(['\uFEFF' + text], {type:'text/plain;charset=utf-8'}));
 const a = document.createElement('a'); a.href = url; a.download = 'BR-GOLF-상담메모.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
 document.getElementById('status').textContent = '상담 메모를 다운로드했습니다. 매장으로 전송되지는 않습니다.';
});
document.getElementById('name').addEventListener('input', event => event.target.setCustomValidity(''));

const photoDialog = document.getElementById('photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
 const image = document.getElementById('photo-full');
 image.src = button.dataset.photo;
 image.alt = button.querySelector('img').alt;
 document.getElementById('photo-caption').textContent = image.alt;
 photoDialog.showModal();
 document.body.classList.add('photo-open');
}));
document.querySelector('.photo-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {if(event.target === photoDialog){const box=photoDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)photoDialog.close();}});
photoDialog.addEventListener('close', () => document.body.classList.remove('photo-open'));
