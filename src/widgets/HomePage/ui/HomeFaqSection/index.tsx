'use client';

import { ReactNode, useState } from 'react';

import { MinusIcon, PlusIcon } from '@/shared/ui/Icons';

import * as S from './styled';

const faqItems = [
  {
    title: 'Как принять участие в мероприятии?',
    text: 'Для участия необходимо зарегистрироваться на странице мероприятия и отправить заявку. После подтверждения заявки организатором вы получите уведомление и электронный билет.',
  },
  {
    title: 'Является ли участие бесплатным?',
    text: 'Да, все мероприятия на платформе бесплатные.',
  },
  {
    title: 'Нужно ли подтверждать участие?',
    text: 'Да, перед началом мероприятия может прийти RSVP-форма, где нужно подтвердить или отклонить участие.',
  },
  {
    title: 'Что делать, если я не смогу присутствовать?',
    text: 'Вы сможете отклонить участие через RSVP-форму или в личном кабинете участника.',
  },
  {
    title: 'Где будет проходить мероприятие?',
    text: 'Место проведения указано на странице мероприятия. Для онлайн-мероприятий будет доступна ссылка.',
  },
];

export default function HomeFaqSection(): ReactNode {
  const [openedIndex, setOpenedIndex] = useState(0);

  return (
    <S.Section>
      <S.Title>Часто задаваемые вопросы</S.Title>

      <S.List>
        {faqItems.map((item, index) => {
          const isOpen = openedIndex === index;

          return (
            <S.Item key={item.title} $isOpen={isOpen}>
              <S.Button
                type="button"
                onClick={() => setOpenedIndex(isOpen ? -1 : index)}
              >
                <S.Number $isOpen={isOpen}>
                  {String(index + 1).padStart(2, '0')}
                </S.Number>
                <S.Question $isOpen={isOpen}>{item.title}</S.Question>
                <S.Icon>{isOpen ? <MinusIcon /> : <PlusIcon />}</S.Icon>
              </S.Button>

              {isOpen && <S.Answer>{item.text}</S.Answer>}
            </S.Item>
          );
        })}
      </S.List>
    </S.Section>
  );
}
