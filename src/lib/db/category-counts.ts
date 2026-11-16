import { getAdminDb } from '../firebase/admin';

export async function adjustCategoryProductCount(
  categoryId: string | undefined,
  delta: number
): Promise<void> {
  if (!categoryId || !delta) return;

  const db = getAdminDb();
  if (!db) return;

  const categoryRef = db.collection('categories').doc(categoryId);
  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(categoryRef);
    if (!snapshot.exists) return;

    const currentCount = snapshot.get('productCount');
    const productCount = typeof currentCount === 'number' ? currentCount : 0;
    transaction.update(categoryRef, {
      productCount: Math.max(0, productCount + delta),
    });
  });
}

export async function moveCategoryProduct(
  previousCategoryId: string | undefined,
  nextCategoryId: string | undefined
): Promise<void> {
  if (previousCategoryId === nextCategoryId) return;
  await adjustCategoryProductCount(previousCategoryId, -1);
  await adjustCategoryProductCount(nextCategoryId, 1);
}
