import type { GameSet } from "../../../models/DataObject";

/**
 * Định nghĩa các props cho component Header.
 * @param tableName - Tên của bàn đấu để hiển thị.
 * @param setArray - Mảng chứa tất cả các set của trận đấu.
 */
export interface HeaderProps {
    setArray: GameSet[];
}