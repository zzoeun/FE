// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';
// import Modal from '../components/modal/Modal';
// import ModalContent from '../components/modal/ModalContent';
// import ModalButtons from '../components/modal/ModalButtons';
// import ModalButton from '../components/modal/ModalButton';

// const DetailedPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [bookData, setBookData] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const token = localStorage.getItem('bearer_token');
//   const userData = JSON.parse(localStorage.getItem('userData'));

//   useEffect(() => {
//     const fetchBookDetail = async () => {
//       if (!id) {
//         setError('잘못된 접근입니다.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         // amount 파라미터를 query string으로 추가
//         const response = await axios.get(`https://project-be.site/books/${id}?amount=${quantity}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         });
        
//         console.log('API Response:', response.data);
//         setBookData(response.data);
//       } catch (err) {
//         console.error('책 정보 로딩 실패:', err);
//         if (err.response?.status === 401) {
//           setError('인증이 필요한 서비스입니다.');
//         } else {
//           setError('책 정보를 불러오는데 실패했습니다.');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBookDetail();
//   }, [id, quantity]); // quantity가 변경될 때마다 API 재호출

//   const handleAddToCart = async () => {
//     if (!token) {
//       setShowModal(true);
//       return;
//     }

//     try {
//       // cart/add API도 GET 메서드로 변경
//       await axios.get(
//         `https://project-be.site/cart/add?bookId=${bookData?.bookId}&amount=${quantity}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
      
//       setShowModal(true);
//     } catch (err) {
//       console.error('장바구니 추가 실패:', err);
//       alert('장바구니 추가에 실패했습니다.');
//     }
//   };

//   const handleMoveToCart = () => {
//     navigate('/mypage/cart');
//     setShowModal(false);
//   };

//   const handlePurchase = () => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }
//     navigate('/payment', { 
//       state: { 
//         bookData,
//         amount: quantity 
//       } 
//     });
//   };

// const handleIncreaseQuantity = () => {
//   setQuantity(prev => prev + 1);
// };

// const handleDecreaseQuantity = () => {
//   if (quantity > 1) {
//     setQuantity(prev => prev - 1);
//   }
// };

// // 수량 직접 입력
// const handleQuantityChange = (e) => {
//   const value = parseInt(e.target.value);
//   if (!isNaN(value) && value > 0) {
//     setQuantity(value);
//   }
// };

//   return (
//     <Container>
//       <BookDetailWrapper>
//         <ImageSection>
//           <BookImage 
//             src={bookData?.bookImageUrl || "https://via.placeholder.com/400x600"} 
//             alt={bookData?.bookTitle || "도서 이미지"} 
//             onError={(e) => {
//               e.target.src = "https://via.placeholder.com/400x600";
//             }}
//           />
//         </ImageSection>
//         <InfoSection>
//           <Title>{bookData?.bookTitle || "도서 제목"}</Title>
//           <InfoRow>
//             <Label>저자</Label>
//             <Value>{bookData?.author || "저자 정보 없음"}</Value>
//           </InfoRow>
//           <InfoRow>
//             <Label>출판사</Label>
//             <Value>{bookData?.publisher || "출판사 정보 없음"}</Value>
//           </InfoRow>
//           <InfoRow>
//             <Label>가격</Label>
//             <Value>{bookData ? `${bookData.bookPrice.toLocaleString()}원` : "가격 정보 없음"}</Value>
//           </InfoRow>
//           <QuantitySection>
//             <Label>수량</Label>
//             <QuantityControl>
//               <QuantityButton onClick={handleDecreaseQuantity}>-</QuantityButton>
//               <QuantityInput 
//                 type="number" 
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 min="1"
//               />
//               <QuantityButton onClick={handleIncreaseQuantity}>+</QuantityButton>
//             </QuantityControl>
//           </QuantitySection>
//           <ButtonGroup>
//           <PurchaseButton onClick={handlePurchase}>바로 구매하기</PurchaseButton>
//           <CartButton onClick={handleAddToCart}>장바구니</CartButton>
//           </ButtonGroup>
//         </InfoSection>
//       </BookDetailWrapper>
//       <SummarySection>
//         <SummaryTitle>책 소개</SummaryTitle>
//         <Summary>{bookData?.bookSummary || "책 소개 정보가 없습니다."}</Summary>
//       </SummarySection>

//       {showModal && (
//         <Modal>
//           <ModalContent>
//             {!token ? (
//               <>
//                 <p>로그인이 필요한 서비스입니다.</p>
//                 <p>로그인 페이지로 이동하시겠습니까?</p>
//               </>
//             ) : (
//               <>
//                 <p>장바구니에 상품을 담았습니다.</p>
//                 <p>장바구니로 이동하시겠습니까?</p>
//               </>
//             )}
//           </ModalContent>
//           <ModalButtons>
//             <ModalButton 
//               onClick={() => !token ? navigate('/login') : handleMoveToCart()}
//             >
//               확인
//             </ModalButton>
//             <Button onClick={() => setShowModal(false)}>취소</Button>
//           </ModalButtons>
//         </Modal>
//       )}
      
//       {/* 로딩 상태와 에러 메시지를 오버레이로 표시 */}
//       {isLoading && (
//         <LoadingOverlay>
//           <LoadingMessage>로딩 중...</LoadingMessage>
//         </LoadingOverlay>
//       )}
//       {/* {error && (
//         <ErrorOverlay>
//           <ErrorMessage>{error}</ErrorMessage>
//         </ErrorOverlay>
//       )} */}
//     </Container>
//   );
// };

// export default DetailedPage;

// const LoadingOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(255, 255, 255, 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// // const ErrorOverlay = styled(LoadingOverlay)`
// // //   background: rgba(255, 0, 0, 0.1);
// // // `;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 400px auto 50px;
//   padding: 0 20px;
// `;

// const BookDetailWrapper = styled.div`
//   display: flex;
//   gap: 50px;
//   margin-bottom: 50px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const ImageSection = styled.div`
//   flex: 0 0 400px;
  
//   @media (max-width: 768px) {
//     flex: 1;
//   }
// `;

// const BookImage = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const InfoSection = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   margin: 30px;
// `;

// const Title = styled.h1`
//   font-size: 32px;
//   margin-bottom: 50px;
//   color: #333;
// `;

// const InfoRow = styled.div`
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   margin-bottom: 5px;
// `;

// const Label = styled.span`
//   font-weight: bold;
//   min-width: 80px;
// `;

// const Value = styled.span`
//   color: #333;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-top: 30px;
// `;

// const Button = styled.button`
//   padding: 15px 30px;
//   border-radius: 8px;
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.3s ease;
// `;

// const PurchaseButton = styled(Button)`
//   background-color: #555555;
//   color: white;
//   border: none;
//   flex: 2;

//   &:hover {
//     background-color: #000;
//   }
// `;

// const CartButton = styled(Button)`
//   background-color: white;
//   color: #000;
//   border: 2px solid #000;
//   flex: 1;

//   &:hover {
//     background-color: #555555;
//     color: white;
//   }
// `;

// const SummarySection = styled.div`
//   margin-top: 50px;
// `;

// const SummaryTitle = styled.h2`
//   font-size: 24px;
//   color: #333;
//   margin-bottom: 20px;
// `;

// const Summary = styled.p`
//   line-height: 1.8;
//   color: #666;
//   white-space: pre-line;
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   padding: 50px;
//   font-size: 18px;
//   color: #666;
// `;

// // const ErrorMessage = styled.div`
// //   text-align: center;
// //   padding: 50px;
// //   font-size: 18px;
// //   color: #f06569;
// // `;

// const QuantitySection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   margin: 20px 0;
// `;

// const QuantityControl = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const QuantityButton = styled.button`
//   width: 30px;
//   height: 30px;
//   border: 1px solid #ddd;
//   background: white;
//   border-radius: 4px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;

//   &:hover {
//     background: #f5f5f5;
//   }
// `;

// const QuantityInput = styled.input`
//   width: 60px;
//   height: 30px;
//   text-align: center;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 16px;

//   &::-webkit-inner-spin-button,
//   &::-webkit-outer-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }

//   &:focus {
//     outline: none;
//     border-color: #555;
//   }
// `;